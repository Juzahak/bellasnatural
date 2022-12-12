import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useEffect } from "react";
import { useState } from "react";

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TermsResponsability() {
  const { data: terms_responsibility } = useSwr(`/api/terms`, fetcher);
  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-bg-title">Termos e Condições</h2>
                <p className="sub-title mb-5">
                Termos e Condições criados para a sua segurança
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="ec-common-wrapper" style={{ whiteSpace: 'pre-wrap' }}>
                {terms_responsibility?.map(item => {return(item.text)})}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
