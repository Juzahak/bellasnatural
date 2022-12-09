import Header from "../../components/Header";
import Footer from "../../components/Footer";

import useSwr, { mutate } from "swr";
import { useEffect } from "react";
import { useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PrivacyPolicy() {
  const { data: policy_privacity } = useSwr(`/api/policy`, fetcher);
  const [policy, setPolicy] = useState('')

  useEffect(() => {

     policy_privacity?.map(item => {
        setPolicy(item.text)
      })
    
    
  }, [policy_privacity])

  console.log(policy)

  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-bg-title">Política de Privacidade</h2>
                <p className="sub-title mb-5">
                  Politica criada para a sua segurança
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="ec-common-wrapper" style={{ whiteSpace: 'pre-wrap' }}>
                {policy}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
