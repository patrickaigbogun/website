// HeaderWrapper.tsx

'use server';
import { getPages } from "@/sanity/sanity-utils";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import LoadingUI from "@/components/loadingui";

const HeaderWrapper = async () => {
  const pages = await getPages();

  return (
    <Suspense fallback={<LoadingUI />}>
      <Header pages={pages} />
    </Suspense>
  );
};

export default HeaderWrapper;
