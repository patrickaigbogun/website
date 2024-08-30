import { getPages } from "@/sanity/sanity-utils";
import Header from "./header";

export default async function HeaderWrapper() {
    const pages = await getPages();
    return <Header pages={pages} />;
}
