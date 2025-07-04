import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import quotesAPI from "../data/quotesAPI.js";
import styles from "../styles/AdminPanel.module.css";
import AlertModal from "./AlertModal";
import { useCallback } from "react";

const QuoteAdminPanel = () => {
    const [quotes, setQuotes] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("info");
    const [onConfirmAction, setOnConfirmAction] = useState(null);

    const fetchQuotes = useCallback(async () => {  // ✅ useCallback agregado
        try {
            const data = await quotesAPI.getAllQuotes();
            setQuotes(data);
        } catch (error) {
            showAlert("Error al obtener las cotizaciones.", "error");
        }
    }, []);  // ✅ Array de dependencias vacío (no depende de nada externo)

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);  // ✅ fetchQuotes añadido como dependencia

    const showAlert = (message, type = "info", onConfirm = null) => {
        setAlertMessage(message);
        setAlertType(type);
        setOnConfirmAction(() => onConfirm);
    };

    const handleConfirm = async (id) => {
        try {
            await quotesAPI.confirmQuote(id);
            fetchQuotes();
            showAlert("Cotización confirmada correctamente", "success");
        } catch (error) {
            showAlert(`Error al confirmar: ${error.message}`, "error");
            console.error("Error confirming quote:", error);
        }
    };

    const handleDelete = (id) => {
        showAlert("¿Deseas eliminar esta cotización?", "confirm", async () => {
            try {
                await quotesAPI.deleteQuote(id);
                fetchQuotes();
                showAlert("Cotización eliminada correctamente", "success");
            } catch (error) {
                showAlert(`Error al eliminar: ${error.message}`, "error");
                console.error("Error deleting quote:", error);
            }
        });
    };
    return (
        <div className={styles.adminContainer}>
            <h2 className={styles.heading}>Panel de Cotizaciones</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>PDF</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Anticipo</th>
                           <th>Creado en</th>  
                        <th>Confirmar</th>
                        <th>Eliminar</th>
                             

                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => (
                        <tr key={quote.quote_id}>
                            <td>
                                <a href={quote.pdf_link} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                                    Ver PDF
                                </a>
                            </td>
                            <td>{quote.client_name}</td>
                            <td>{quote.phone_number}</td>
                            <td>{quote.confirmation_status ? "Sí" : "No"}</td>
                                        <td>{new Date(quote.created_at).toLocaleString()}</td>  {/* Fecha formateada */}

                            <td>
                                {!quote.confirmation_status && (
                                    <button
                                        onClick={() => handleConfirm(quote.quote_id)}
                                        className={styles.adminButton}
                                    >
                                        <FaCheck />
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(quote.quote_id)}
                                    className={styles.adminButton}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {alertMessage && (
                <AlertModal
                    message={alertMessage}
                    type={alertType}
                    onClose={() => {
                        setAlertMessage("");
                        setOnConfirmAction(null);
                    }}
                    onConfirm={() => {
                        if (onConfirmAction) onConfirmAction();
                        setAlertMessage("");
                        setOnConfirmAction(null);
                    }}
                />
            )}
        </div>
    );
};

export default QuoteAdminPanel;