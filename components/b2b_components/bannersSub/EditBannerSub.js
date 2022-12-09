import axios from "axios";
import router from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

export default function EditBannerSub({ setShowEditCategoryComponent, bannerSubEditId, bannersSubarr }) {
  const [bannersSubTitle, setBannerSubTitle] = useState("");
  const [bannersSubText, setBannerSubText] = useState("");
  const [bannersSubLink, setBannerSubLink] = useState("");
  const [bannersSubButton, setBannerSubButton] = useState("");
  const [bannersSub, setBannersSub] = useState("");
  const [bannersSubIsActive, setActive] = useState(1);
  const [imageInput, setImage] = useState([]);
  const [imageInputNew, setImageNew] = useState([]);
  const [id_, setId_] = useState(0);

  const [imageFile, setImageFile] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  useEffect(() => {
    bannersSubarr?.map(item => {
      if (item.id === bannerSubEditId) {
        setBannerSubTitle(item.title);
        setBannerSubText(item.text);
        setBannerSubButton(item.btnText);
        setBannerSubLink(item.btnLink);
        setImage(JSON.parse(item.image));
        setActive(item.active);
        setId_(item.id)
      }
    })
  }, [bannerSubEditId]);

  function changeImageSrc(files) {
    const reader = new FileReader();

    setImageNew([
      {
        image: files,
        path: Math.floor(Math.random() * (1000000000 + 10)),
      },
    ]);

    reader.onload = function () {
      setBannersSub(reader.result);
    };

    reader.readAsDataURL(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let imageArr = [];

    if (imageInputNew.length > 0) {
      imageInput.forEach(item => {
        console.log(item.path)
        const desertRef = ref(storage, `image/${item.path}`);

        deleteObject(desertRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      })
    }
    if (imageInputNew.length > 0) {
      imageInputNew.forEach(async item => {
        if (item.image) {
          const name = item.path;
          const storageRef = ref(storage, `image/${name}`)
          const uploadTask = uploadBytesResumable(storageRef, item.image)
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100

              setProgressUpload(progress) // to show progress upload

              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
              }
            },
            (error) => {
              alert(error.message)
            },

            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                //url is download url of file
                setDownloadURL((current) => [
                  ...current,
                  {
                    url: url,
                    path: name,
                  },
                ]);
                const obj = [{ url: url, path: name }];
                imageArr = obj;
              })
            },
          )
        } else {
          alert('File not found')
        }

        contador++

        toast('Aguarde Sub-Banner sendo editado!', {
          position: "top-right",
        });


        setTimeout(async () => {
          console.log(imageArr, contador)
          if (imageInput.length === contador) {
            contador = 0;
            let data = await axios.put(`/api/subBanners/` + id_, {
              title: bannersSubTitle,
              text: bannersSubText,
              btnText: bannersSubButton,
              btnLink: bannersSubLink,
              image: JSON.stringify(imageArr),
              active: bannersSubIsActive,
            });
            mutate(`/api/subBanners`);
            if (data.data) router.push("/b2b/subBanners");
          }
        }, 3000)
      })
    } else {
      toast('Aguarde Sub-Banner sendo editado!', {
        position: "top-right",
      });

      setTimeout(async () => {
        let data = await axios.put(`/api/subBanners/` + id_, {
          title: bannersSubTitle,
          text: bannersSubText,
          btnText: bannersSubButton,
          btnLink: bannersSubLink,
          image: JSON.stringify(imageInput),
          active: bannersSubIsActive,
        });
        mutate(`/api/subBanners`);
        if (data.data) router.push("/b2b/subBanners");
      }, 3000)
    }
  };


  console.log(imageInput, imageInputNew)

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <div className="d-flex justify-content-between">
          <h4>Editar Banner</h4>
          <a className="btn btn-primary">
            Voltar
          </a>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Titulo
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                defaultValue={bannersSubTitle}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Texto
            </label>
            <div className="col-12">
              <textarea
                id="text"
                name="text"
                defaultValue={bannersSubText}
                className="form-control here slug-title p-0"
                style={{ borderRadius: '0px' }}
                rows="5"
                onChange={(e) => setBannerSubText(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Escrita Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                defaultValue={bannersSubButton}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubButton(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Link Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                defaultValue={bannersSubLink}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerSubLink(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Imagem
            </label>
            <div style={{ height: '60px', display: 'flex' }}>
              {imageInput?.map((item, index) => {
                return (
                  <Image
                    key={index}
                    className="ec-brand-icon"
                    style={{ minWidth: "300px", objectFit: 'cover' }}
                    src={bannersSub || item.url}
                    alt=""
                    width={150}
                    height={150}
                  />)
              })}
            </div>
            <div className="col-12">
              <input
                id="color"
                name="color"
                className="form-control here slug-title p-0"
                style={{ paddingLeft: '10px !important', height: '30px' }}
                type="file"
                onChange={(e) => changeImageSrc(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row align-items-center">
            <label className="form-label">Ativado</label>
            {bannersSubIsActive === 1 ?
              <>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
                    value={1}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setActive(e.target.value)}
                  />
                  Sim
                </div>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    value={0}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setActive(e.target.value)}
                  />
                  Não
                </div>
              </>
              :
              <>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    value={1}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setActive(e.target.value)}
                  />
                  Sim
                </div>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
                    value={0}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setActive(e.target.value)}
                  />
                  Não
                </div>
              </>
            }

          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
                Editar Banner
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
