import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import style from "./PreviewBlog.module.css";

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PreviewBlog({
    authorName,
    authorTitle,
    authorDescription,
    blogTitle,
    shortDescription,
    blogImage,
    authorImage,
    posterImage,
    description,
  }) {

    console.log(blogImage,"ye")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <Button onClick={handleOpen}>Preview</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <div className={style.main}>
            <div className={style.container}>
              <div className={style.blog_box}>
                {blogImage.map((img, index) => (
                  <img key={index}   src={URL.createObjectURL(img)} alt={blogTitle} />
                ))}
              </div>
              <br/>
              <div className={style.author_box}>
                <p>{authorName}</p>
                <p>-</p> <p>{convertDate(new Date())}</p>
              </div>
              <div className={style.title_box}>
                <h6>{blogTitle}</h6>
                <p>{convertToJSX(description)}</p>
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
