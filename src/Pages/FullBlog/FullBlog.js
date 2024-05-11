import React, { useEffect, useState } from "react";
import OptionBar from "../../Component/OptionBar/OptionBar";
import style from "./FullBlog.module.css";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import { getSingleBlog } from "../../Api/Api";
import { useParams } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import NavBar from "../../Component/NavBar/NavBar";
import VisibilityIcon from '@mui/icons-material/Visibility';

function FullBlog() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const { id } = useParams();
  const [isLoading, SetIsloading] = useState(false);

  useEffect(() => {
    handleSingleBlog();
  }, []);

  const handleSingleBlog = async () => {
    SetIsloading(true);
    try {
      const response = await getSingleBlog(id);
      console.log(response.data, "response");
      setOriginalProducts(response.data);
    } catch (error) {
      console.error("Error getting products:", error.message);
    } finally {
      SetIsloading(false);
    }
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  function convertToJSX(htmlString) {
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlString },
    });
  }

  return (
    <div className={style.main}>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <OptionBar />
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.blog_box}>
            <img
              src={originalProducts?.blogImage?.url}
              alt={originalProducts?.blogTitle}
            />
          </div>
          <br />
          <div className={style.author_box}>
            <p>{originalProducts?.authorName}</p>
            <p>-</p> <p>{convertDate(originalProducts?.createdAt)}</p>
          </div>
          <div className={style.title_box}>
            <h6>{originalProducts?.blogTitle}</h6>
            <p>{convertToJSX(originalProducts?.description)}</p>
          </div>
          <div className={style.bottom_box}>
            <div></div>
            <ul>
              <li>
                <FacebookRoundedIcon className={style.icon} />
              </li>
              <li>
                <InstagramIcon className={style.icon} />
              </li>
              <li>
                <LinkedInIcon className={style.icon} />
              </li>
              <li>
                <TwitterIcon className={style.icon} />
              </li>
            </ul>
          </div>
          <div className={style.author_info_box}>
            <div className={style.inner_container}>
              <div className={style.user_box_img}>
                <img
                  src={originalProducts?.authorImage?.url}
                  alt={originalProducts?.authorTitle}
                />
              </div>
              <div className={style.des_box}>
                <div>
                  <h5>{originalProducts?.authorName}</h5>
                  <span style={{ fontWeight: 600 }}>
                    {originalProducts?.authorTitle}
                  </span>
                </div>
                <span>{originalProducts?.authorDescription}</span>
                <div className={style.bottom_box}>
                  <div></div>
                  <ul>
                    <li>
                      <FacebookRoundedIcon className={style.icon} />
                    </li>
                    <li>
                      <InstagramIcon className={style.icon} />
                    </li>
                    <li>
                      <LinkedInIcon className={style.icon} />
                    </li>
                    <li>
                      <TwitterIcon className={style.icon} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
