import axios from "axios";
import { ContactView } from "./contact.view"


export const ContactContainer = () => {
    return (
        <>
            <ContactView />
        </>
    )
}

export async function getStaticProps() {
    const [informationRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/information/"),

    ]);

    return {
        props: {
            information: informationRes.data.results || [],
        },
    };
}