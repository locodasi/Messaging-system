
const  NotUser = ()=> {
    const styles = {
        notContact: {
            width: "100%",
            height: "100%",
            background: `url(https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/12/04/mensajes-de-google.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
        },
        container: {
            height: "500px" // Ajusta la altura según tus necesidades
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.notContact}></div>
        </div>
    );
}

export default NotUser