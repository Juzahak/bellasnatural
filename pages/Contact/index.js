import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from 'next/image';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Contact() {
  return (
    <>
      <Header />

      <section class="ec-page-content section-space-p">
        <div class="container">
          <div class="row">
            <div class="ec-common-wrapper d-flex mob-column">
              <div class="ec-contact-leftside">
                <div class="ec-contact-container">
                  <div class="ec-contact-form">
                    <form action="#" method="post">
                      <span class="ec-contact-wrap">
                        <label htmlFor="name">Nome*</label>

                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nome"
                          required
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="email">Email*</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="phonenumber">Telefone*</label>
                        <input
                          type="text"
                          name="phonenumber"
                          id="phonenumber"
                          placeholder="Telefone"
                          required
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="message">Mensagem*</label>
                        <textarea
                          name="address"
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                        ></textarea>
                      </span>

                      <span class="ec-contact-wrap ec-contact-btn justify-content-center">
                        <button class="btn btn-primary rounded" type="submit">
                          Enviar
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
              <div className="ec-contact-rightside">
                <div className="col-12 d-flex justify-content-center flex-column align-items-center mb-4">
                <Image src={require("../../assets/img/imageLogo.jpg")} alt="" className="visualimg" width={800} height={800}/>
                    <div className="col-12 col-md-7 mt-4 mb-3">
                      <Image src={require("../../assets/img/nameLogo.jpg")} alt="" width={800} height={800}/>
                    </div>
                    <div class="ec_contact_info">
                  <h1 class="ec_contact_info_head">Contato</h1>
                  <ul class="align-items-center">

                    <li class="ec-contact-item align-items-center">
                    <FaMapMarkerAlt />
                      <span className="pl-1">Endereço :</span>
                      <a href="#">Av. Saudade, 398 - Vila Vakula, Cosmópolis - SP, 13150-000</a>
                    </li>
                    <li class="ec-contact-item align-items-center">
                      <FaPhoneAlt />
                      <span className="pl-1">Telefone :</span>
                      <a href="tel:+55193872-5710">(19) 3872-5710</a>
                    </li>
                    <li class="ec-contact-item align-items-center">
                      <FaEnvelope />
                      <span className="pl-1">Email :</span>
                      <a href="mailto:sac@cosmospiscinas.com.br">
                        sac@cosmospiscinas.com.br
                      </a>
                    </li>
                  </ul>
                </div>
                </div>
              </div>
            </div>
                <div class="ec_contact_map col-12 mt-5">
                  <div class="ec_map_canvas">
                    <iframe
                      id="ec_map_canvas"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.215225497644!2d-47.188241585567106!3d-22.64576273430098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c89242bf0a3895%3A0xf269974865287697!2sAv.%20Saudade%2C%20398%20-%20Vila%20Vakula%2C%20Cosm%C3%B3polis%20-%20SP%2C%2013150-000!5e0!3m2!1spt-BR!2sbr!4v1669827873656!5m2!1spt-BR!2sbr"
                    ></iframe>
                    <a href="https://sites.google.com/view/maps-api-v2/mapv2"></a>
                  </div>
                </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
