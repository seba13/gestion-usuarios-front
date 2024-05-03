import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useEffect, useState, useContext } from "react";
import { FormData } from "../../../../interfaces/formData";
import { useForm } from "../../../../hooks/useForm";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { UseNotification } from "../../../../hooks/useNotification";
import { Notification } from "../../../../components/Notification/Notification";
import notificationStyles from "../../../../components/Notification/Notification.module.css";
import { FetchMethods, useFetch } from "../../../../hooks/useFetch";
import { AuthContext } from "../../../../context/AuthContext";
import { Employee } from "../../../../interfaces/Employees";

const initialData: FormData = {
  tipoCarta: {
    type: "number",
    value: "",
    required: true,
    name: "tipoCarta",
  },
};

export const EmployeeLetterGenerator = ({ empleado }: { empleado: Employee }) => {
  const { idEmisor, rutEmisor } = useContext(AuthContext)!;
  const { handleAddNotification, notifications, handleDeleteNotification, setTimeoutNotification } = UseNotification();
  const [text, setText] = useState<string | null>();
  const [dataEmisor, setDataEmisor] = useState<Employee>();
  const { handleFetch } = useFetch();
  const { form, handleChange } = useForm({ initialData });

  const optionTipoCarta = [
    {
      name: "Contrato",
      value: 1,
    },
    {
      name: "Despido",
      value: 2,
    },
    {
      name: "Vacaciones",
      value: 3,
    },
    {
      name: "Amonestación",
      value: 4,
    },
    {
      name: "Recomendación",
      value: 5,
    },
    {
      name: "Felicitaciones",
      value: 6,
    },
  ];

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        {/* <select className="ql-header" defaultValue={0}>
          <option value={1}>Heading </option>
          <option value={2}>Subheading </option>
          <option value={0}>Normal</option>
        </select> */}
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  useEffect(() => {
    handleFetch({ url: `${import.meta.env.VITE_URL_API}empleado/rut/${rutEmisor}`, method: FetchMethods.GET }).then((response) => {
      if (response.message) {
        setDataEmisor(response.message as Employee);
      }
    });
  }, []);

  const handleSaveLetter = () => {
    if (!text) {
      handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Ingrese texto de la carta" } });
    } else {
      console.log("aca");
      console.log({ idEmisor, idEmpleado: empleado.idEmpleado, motivo: text, idTipoCarta: form.tipoCarta.value });

      handleFetch({ url: `${import.meta.env.VITE_URL_API}carta`, method: FetchMethods.POST, dataFetch: { idEmisor, idEmpleado: empleado.idEmpleado, motivo: text, idTipoCarta: form.tipoCarta.value } })
        .then((response) => {
          if (response.code === 200) {
            handleAddNotification({ propNotification: { id: Date.now(), type: "success", message: "Carta guardada con éxito" } });
          }
        })
        .catch(() => {
          handleAddNotification({ propNotification: { id: Date.now(), type: "error", message: "Ocurrió un error al guardar carta" } });
        });
    }
  };

  const header = renderHeader();

  const handlerSelect = (option: { value: string; name: string }, name: string, type: string, required: boolean) => {
    console.log(option.value);
    handleChange({
      name,
      type,
      value: option.value,
      required,
    });
  };

  useEffect(() => {
    const fecha = new Date();
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;

    const fechaFormateada = `${año}/${mesFormateado}/${diaFormateado}`;

    switch (parseInt(form.tipoCarta.value)) {
      case 1:
        setText(`<div style='font-size:10px;'>
            <p><strong>Fecha: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
            <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
            <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
            <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
            <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
            <p>Nos complace informarte que has sido seleccionado/a para ocupar el puesto de ${empleado.cargo} en nuestra empresa. Tu fecha de ingreso será el ${empleado.fecIngreso}. Adjunto encontrarás tu contrato de trabajo, el cual detalla tus responsabilidades, beneficios y condiciones laborales.</p>
            <p>Por favor, revisa detenidamente el contrato y firma donde corresponda para formalizar tu ingreso a la empresa. No dudes en contactarnos si tienes alguna pregunta o necesitas más información.</p>
            <p>¡Te damos la bienvenida a nuestro equipo!</p>
            <br>
            <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
            <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
            <p>Cargo: ${dataEmisor?.cargo}</p>
          </div>`);
        return;

      case 2:
        setText(`<div style='font-size: 10px'>
        <p><strong>Fecha: </strong>${fechaFormateada}</p>
        <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
        <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
        <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
        <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
        <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
        <p>Nos dirigimos a usted con el fin de informarle que, lamentablemente, su empleo en ReportService llegará a su fin. Esta decisión ha sido tomada [razón para el despido].</p>
        <p>Agradecemos sinceramente su dedicación y contribuciones durante su tiempo en nuestra empresa. Le deseamos lo mejor en sus futuros esfuerzos.</p>
        <br>
        <p>Por favor, no dude en ponerse en contacto con nosotros si necesita cualquier tipo de asistencia durante esta transición.</p>
        <br>
        <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
        <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
        <p>Cargo: ${dataEmisor?.cargo}</p>
      </div>`);
        return;

      case 3:
        setText(`<div style='font-size: 10px'>
            <p><strong>Fecha: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
            <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
            <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
            <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
            <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
            <p>Nos complace informarte que se te ha concedido un período de vacaciones desde el [Fecha de Inicio] hasta el [Fecha de Término]. Esperamos que este tiempo te permita descansar y recargar energías para continuar con tus labores con renovado entusiasmo.</p>
            <p>Por favor, asegúrate de dejar todo en orden antes de tu partida y comunica cualquier asunto pendiente a tu supervisor. ¡Que disfrutes tus vacaciones!</p>
            <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
            <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
            <p>Cargo: ${dataEmisor?.cargo}</p>
          </div>`);
        return;

      case 4:
        setText(`<div style='font-size: 10px'>
            <p><strong>Fecha: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
            <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
            <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
            <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
            <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
            <p>Te escribimos para comunicarte que hemos observado [motivo de la amonestación] en tu desempeño laboral. Queremos recordarte la importancia de [aspecto a mejorar] para el buen funcionamiento de nuestro equipo.</p>
            <p>Esperamos que esta comunicación sirva para mejorar tu rendimiento y evitar futuras situaciones similares. Estamos disponibles para ofrecerte el apoyo necesario para que puedas alcanzar tus metas laborales.</p>
            <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
            <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
            <p>Cargo: ${dataEmisor?.cargo}</p>
          </div>`);
        return;

      case 5:
        setText(`<div style='font-size: 10px'>
            <p><strong>Fecha: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
            <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
            <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
            <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
            <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
            <p>Nos complace recomendarte como [cargo] basados en tu excelente desempeño y compromiso en nuestra empresa. Durante tu tiempo con nosotros, has demostrado [cualidades destacadas].</p>
            <p>Estamos seguros de que serás un activo valioso en cualquier organización y te deseamos mucho éxito en tus futuros desafíos profesionales.</p>
            <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
            <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
            <p>Cargo: ${dataEmisor?.cargo}</p>
          </div>`);
        return;

      case 6:
        setText(`<div style='font-size: 10px'>
            <p><strong>Fecha: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono Empleado: </strong>${empleado.telefono}</p>
            <p><strong>Rut Empleado: </strong>${empleado.rut}</p>
            <p><strong>Dirección Empleado: </strong>${empleado.calle} #${empleado.numero}</p>
            <p><strong>Region, Provincia, Comuna: </strong>${empleado.region}, ${empleado.provincia}, ${empleado.comuna}</p>
            <br>
            <p>Estimado/a ${empleado.nombre} ${empleado.paterno} ${empleado.materno},</p>
            <br>
            <p>Nos complace felicitarte por [logro o motivo de la felicitación]. Tu dedicación y esfuerzo han sido fundamentales para alcanzar este éxito. Esperamos que este logro te motive a seguir trabajando con la misma pasión y compromiso.</p>
            <p>Te extendemos nuestras más sinceras felicitaciones y te agradecemos por tu contribución a nuestra empresa.</p>
            <p>Atentamente, ${dataEmisor?.nombre} ${dataEmisor?.paterno} ${dataEmisor?.materno}</p>
            <p>Rut: ${dataEmisor?.rut}-${dataEmisor?.dv}</p>
            <p>Cargo: ${dataEmisor?.cargo}</p>
          </div>`);
        return;
    }
  }, [form]);

  return (
    <div className="card p-2 " style={{ width: "100%", border: "2px solid #edede9" }}>
      <Dropdown
        value={form.tipoCarta.value}
        name="tipoCarta"
        id="tipoCarta"
        onChange={(e) => handlerSelect(e.value, e.target.name, "number", true)}
        options={optionTipoCarta}
        optionLabel="name"
        placeholder="Seleccione carta"
        className="w-full md:w-14rem"
        required={true}
        // invalid={firstPressed.first && errors && errors.estadoCivil ? true : false || false}
      />
      <Editor
        value={(text && text) || ""}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
        headerTemplate={header}
        style={{
          height: "320px",
        }}
      />
      <Button label="Guardar Carta" onClick={() => handleSaveLetter()}></Button>

      <div className={notificationStyles["container-notifications"]}>
        {notifications.map((notification) => {
          setTimeoutNotification(notification.id, 4250);

          return <Notification key={notification.id} propNotification={notification} onClose={() => handleDeleteNotification(notification.id)} />;
        })}
      </div>
    </div>
  );
};
