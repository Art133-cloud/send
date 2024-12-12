import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import LikeAndComment from "../likeAndComment/LikeAndComment";

interface PostProps {
  comment: string;
  imagesContent: JSX.Element[] | null;
  videoContent: JSX.Element | null;
  src: string;
  alt: string;
  userName: string;
  when: string;
}

export default function Post({
  videoContent,
  comment,
  imagesContent,
  src,
  alt,
  userName,
  when,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [firstPart, setFirstPart] = useState("");
  const [remainingPart, setRemainingPart] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const fullText = comment;
  const maxLength = 100;

  useEffect(() => {
    if (fullText.length > maxLength) {
      setFirstPart(fullText.slice(0, maxLength));
      setRemainingPart(fullText.slice(maxLength));
    } else {
      setFirstPart(fullText);
      setRemainingPart("");
    }
  }, [fullText]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = ""; // Restore scroll
  };

  const openGalleryModal = () => {
    setShowGallery(true);
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  const closeGalleryModal = () => {
    setShowGallery(false);
    document.body.style.overflow = ""; // Restore scroll
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.post}>
      <div className={styles.topPost}>
        <div className={styles.authorPost}>
          <img src={src} alt={alt} width={45} height={45} />
          <div className={styles.info}>
            <h2>{userName}</h2>
            <p>{when}</p>
          </div>
        </div>
      </div>
      <div className={styles.contentPost}>
        {videoContent && <div className={styles.video}>{videoContent}</div>}

        {comment && (
          <div className={styles.hiddenText}>
            <p>
              {firstPart}
              {remainingPart && isExpanded && (
                <span className={styles.expandedText}>{remainingPart}</span>
              )}
              {remainingPart && (
                <span
                  onClick={handleToggle}
                  className={`${styles.toggleButton} ${
                    isExpanded ? styles.expandedButton : ""
                  }`}
                >
                  {isExpanded ? "See Less" : "See More"}
                </span>
              )}
            </p>
          </div>
        )}

        {imagesContent && imagesContent.length > 0 && (
          <div className={styles.images}>
            {imagesContent.slice(0, 2).map((child, index) =>
              React.cloneElement(child, {
                onClick: () => openImageModal(child.props.src),
                className: styles.thumbnail,
                key: index,
              })
            )}

            {imagesContent.length > 2 && (
              <div className={styles.viewAll} onClick={openGalleryModal}>
                <p>{`+${imagesContent.length - 2}`}</p>
              </div>
            )}
          </div>
        )}

        {selectedImage && (
          <div className={styles.overlay} onClick={closeImageModal}>
            <div
              className={styles.modalLargeImage}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeImageModal}>
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Expanded view"
                className={styles.largeImage}
              />
            </div>
          </div>
        )}

        {showGallery && imagesContent && (
          <div className={styles.overlay} onClick={closeGalleryModal}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeGalleryModal}>
                &times;
              </button>
              <div className={styles.galleryImages}>
                {imagesContent.map((child, index) => (
                  <img
                    src={child.props.src}
                    alt={`Gallery image ${index}`}
                    key={index}
                    onClick={() => openImageModal(child.props.src)}
                    className={styles.thumbnail}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <LikeAndComment />
      </div>
    </div>
  );
}
