import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modal";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";
import FormData from 'form-data';

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../firebaseConfig';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Customers() {
  const [id_, setId] = useState(0);
  const { data: customers } = useSwr(`/api/customers`, fetcher);

  const [imageFile, setImageFile] = useState()
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)

  var tamanho = customers?.length || [];
  const storage = getStorage();
  const desertRef = ref(storage, 'image/favicon.png');
  console.log(storage)



  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">

            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <div>
                  <h1>Produtos</h1>
                  <p className="breadcrumbs">
                    <span>
                      <Link href="/b2b">Dashboard</Link>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Clientes
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-body">
                      <div className="table-responsive">
                        {tamanho === 0 && (
                          <div className="text-center">
                            Não possui nenhum cliente cadastrado
                          </div>
                        )}

                        {tamanho !== 0 && (
                          <table
                            id="responsive-data-table"
                            className="table"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Cidade</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {customers?.map((item, index) => {
                                var string1 = JSON.parse(item.address_one);
                                var string2 = JSON.parse(item.address_one);
                                var string3 = JSON.parse(item.address_one);
                                var string4 = JSON.parse(item.address_one);
                                console.log(string1[0].street)
                                return (
                                  <tr key={item.id} className="align-middle">
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{string1[0].state}</td>
                                    <td className="text-right">
                                      <div className="btn-group">
                                        <a
                                          href="javasript:void(0)"
                                          data-link-action="editmodal"
                                          title="Edit Detail"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_modal"
                                          className="btn btn-primary"
                                          onClick={() => setId(item.id)}
                                        >
                                          Visualizar
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal customers={customers} id_={id_}/>
    </div>
  );
}
