import React from "react";
import SectionHeader from "../components/SectionHeader";
import HorizontalSlider from "../components/HorizontalSlider";
import styles from "../styles/AboutService.module.css";
import { testimonios } from "../data/testimonios";

const AboutServiceContent = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <SectionHeader title="Testimonios" />
        <HorizontalSlider>
          {testimonios.map((testimonio) => (
            <div key={testimonio.id} className={styles.testimonyCard}>
              <img
                src={testimonio.image}
                alt={testimonio.name}
                className={styles.testimonyImage}
              />
              <h3 className={styles.testimonyName}>{testimonio.name}</h3>
              <p className={styles.testimonyComment}>{testimonio.comment}</p>
            </div>
          ))}
        </HorizontalSlider>
        <SectionHeader title="Preguntas Frecuentes (FAQs)" />
        <div className={styles.termsContainer}>
          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Cuánto tiempo de anticipación se debe reservar un servicio?</h3>
            <p className={styles.termText}>
              Para eventos de más de 80 cócteles, se recomienda hacer la solicitud de cotización con al menos 1 mes de anticipación, ya que se requiere tiempo para coordinar detalles mediante chat, videollamada y una visita al sitio del evento.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Cuál es el número mínimo y máximo de personas que atendemos?</h3>
            <p className={styles.termText}>
              No se limita por número de personas, sino por cantidad de cócteles. El mínimo es 55 unidades; el máximo es relativo y depende del evento.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Qué sucede si el evento se cancela o reprograma?</h3>
            <p className={styles.termText}>
              Se solicita un adelanto del 50% para asegurar la fecha. En caso de cancelación o reprogramación, el reembolso se evalúa según el caso.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Ofrecemos opciones sin alcohol o para necesidades especiales?</h3>
            <p className={styles.termText}>
              Sí, contamos con mocteles (mocktails), que son bebidas sin alcohol ideales para todo público.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Hay costos extra por transporte o por personal adicional?</h3>
            <p className={styles.termText}>
              Sí. Los costos varían según la ubicación del evento y el tamaño del mismo.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Cómo es el proceso de contratación y pago?</h3>
            <p className={styles.termText}>
              Inicia con conversaciones vía chat, videollamada y visita al sitio. Se elabora un contrato, se firma y se paga el 50% para reservar. El otro 50% se paga tras finalizar el evento. Aceptamos Sinpe o transferencia.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>¿Qué cobertura geográfica tenemos?</h3>
            <p className={styles.termText}>
              Atendemos principalmente Palmares, San Ramón y Naranjo. También cubrimos el GAM, sujeto a condiciones como accesibilidad, horario y ubicación.
            </p>
          </div>
        </div>
        <SectionHeader title="Términos y Condiciones de Servicio" />
        <div className={styles.termsContainer}>
          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>1. ACEPTACIÓN DE LOS TÉRMINOS</h3>
            <p className={styles.termText}>
              Al acceder a nuestro sitio web y contratar cualquiera de nuestros servicios, el usuario acepta los presentes términos y condiciones. Si no está de acuerdo, debe abstenerse de utilizar este sitio o contratar nuestros servicios.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>2. DESCRIPCIÓN DEL SERVICIO</h3>
            <p className={styles.termText}>
              [Tiki House Bar to Go] ofrece servicios de coctelería y bebidas personalizadas a domicilio en formato "Bar To Go" para eventos sociales y corporativos. Esto puede incluir:
            </p>
            <ul className={styles.termList}>
              <li>Cócteles y mocktails preelaborados o preparados en sitio.</li>
              <li>Kits de bebidas y productos relacionados.</li>
            </ul>
            <p className={styles.termText}>
              Los servicios pueden contratarse por paquete o por consumo unitario según la disponibilidad y las condiciones descritas en cada oferta.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>3. CONDICIONES DE COMPRA Y RESERVA</h3>
            <ul className={styles.termList}>
              <li>Toda contratación debe realizarse con un mínimo de 30 días de anticipación.</li>
              <li>Se requiere un adelanto del 50% para confirmar la reserva una vez entregada la cotización y firmado el contrato.</li>
              <li>El pago puede realizarse vía sinpe o transferencia bancaria.</li>
              <li>Los precios están sujetos a cambio sin previo aviso hasta que se confirme la reserva.</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>4. POLÍTICA DE CANCELACIÓN/REPROGRAMACIÓN Y REEMBOLSOS</h3>
            <ul className={styles.termList}>
              <li>Cancelaciones con 15 días de anticipación tendrán derecho a un reembolso del 50% del anticipo.</li>
              <li>Reprogramaciones con 15 días de anticipación se aplica un reembolso 40% del anticipo y se mantienen las condiciones del contrato inicial.</li>
              <li>En caso de fuerza mayor (clima extremo, desastres, pandemia, etc.), por interés del cliente se reprogramará el evento y se evaluará un reembolso total.</li>
              <li>En caso de fuerza mayor (accidente de tránsito durante el traslado, bloqueos, condición médica), que el proveedor no pueda cumplir con el contrato se realizará el reembolso total del anticipo.</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>5. CONDICIONES DE ENTREGA Y LOGÍSTICA</h3>
            <ul className={styles.termList}>
              <li>El servicio está disponible únicamente en Zona de Occidente principalmente, Palmares, San Ramón y Naranjo, La Garita y Cercanías de Alajuela centro. El rubro de transporte va a variar de acuerdo con la ubicación del sitio, nada de ubicaciones 4x4 para su debido acceso.</li>
              <li>El cliente debe garantizar condiciones adecuadas para el montaje del bar, como: zona bajo techo e iluminada, electricidad y servicio de agua potable con pila para lavado de utensilios y cristalería en la zona de trabajo.</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>6. EDAD LEGAL Y CONSUMO RESPONSABLE</h3>
            <ul className={styles.termList}>
              <li>El cliente declara ser mayor de 18 años de edad según la legislación local.</li>
              <li>Tiki House Bar to Go promueve el consumo responsable de alcohol. Nos reservamos el derecho de suspender el servicio si se presentan conductas inapropiadas o ilegales durante el evento.</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>7. LIMITACIÓN DE RESPONSABILIDAD</h3>
            <ul className={styles.termList}>
              <li>No nos hacemos responsables por efectos adversos ocasionados por consumo excesivo de bebidas alcohólicas.</li>
              <li>Tampoco nos responsabilizamos por daños a terceros durante el evento, ni por accidentes derivados del mal uso del servicio.</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>8. PROTECCIÓN DE DATOS PERSONALES</h3>
            <ul className={styles.termList}>
              <li>Recopilamos datos personales solo con fines operativos y de atención al cliente.</li>
              <li>No compartimos ni vendemos esta información a terceros.</li>
              <li>Cumplimos con la normativa vigente de protección de datos (Ley N° 8968).</li>
            </ul>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>9. MODIFICACIONES A LOS TÉRMINOS</h3>
            <p className={styles.termText}>
              TIKI HOUSE BAR TO GO se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios se notificarán mediante este sitio web y serán efectivos desde su publicación.
            </p>
          </div>

          <div className={styles.termSection}>
            <h3 className={styles.termTitle}>10. CONTACTO</h3>
            <p className={styles.termText}>
              Para dudas, sugerencias o solicitudes relacionadas con estos términos, puede contactarnos en:
            </p>
            <ul className={styles.termList}>
              <li>📧 tikihousepalmares@gmail.com</li>
              <li>📞 8560-7573</li>
            </ul>
          </div>
        </div>
         
      </main>
      
    </div>
  );
};

export default AboutServiceContent;