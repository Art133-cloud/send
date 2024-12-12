"use client";
import { useState } from "react";
import styles from "./CreatePost.module.scss";
import PostProfileImg from "../../../public/assets/png/accountHeadImage.png";
import Image from "next/image";
import SecondUserAuthor from "../../../public/assets/png/AuthorFive.png";
import Pencil from "../../../public/assets/svg/Pencil";

type PostContent = {
  comment: string;
  imagesContent: JSX.Element[] | null;
  videoContent: JSX.Element[] | null;
  src: string;
  alt: string;
  userName: string;
  when: string;
};

interface CreatePostProps {
  onPostSubmit: (newPost: PostContent) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [postText, setPostText] = useState('');
  const [mediaContent, setMediaContent] = useState<File[]>([]); // Сохраняем как изображения, так и видео
  const [feeling, setFeeling] = useState<string | null>(null);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaContent([...mediaContent, ...Array.from(e.target.files)]);
    }
  };

  const handlePostSubmit = () => {
    const newPost: PostContent = {
      comment: postText.trim(), // Текст, который пользователь ввел (если есть)
      imagesContent: mediaContent.filter(file => file.type.startsWith('image')).map(file => (
        <img key={file.name} src={URL.createObjectURL(file)} alt="uploaded" />
      )),
      videoContent: mediaContent.filter(file => file.type.startsWith('video')).map(file => (
        <video key={file.name} src={URL.createObjectURL(file)} controls />
      )),
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "User", // Можно заменить на данные пользователя
      when: "Just Now", // Можно заменить на временную метку
    };

    onPostSubmit(newPost); // Отправляем данные в родительский компонент
    resetForm(); // Сбрасываем форму
  };

  const resetForm = () => {
    setPostText('');
    setMediaContent([]);
    setFeeling(null);
  };

  const isPostValid = () => {
    // Теперь можно отправить, если есть комментарий или медиа-контент
    return postText.trim() !== '' || mediaContent.length > 0;
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.buttons}>
        <button onClick={handlePostSubmit} disabled={!isPostValid()}>
          <div className={styles.pencil}>
            <Pencil />
          </div>
          <p>Create Post</p>
        </button>
      </div>
      <div className={styles.header}>
        <Image src={PostProfileImg.src} alt="Profile" width={40} height={40} />
        <textarea
          value={postText}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
        />
      </div>

      <div className={styles.labels}>
        <label>Live Video</label>
        <label htmlFor="media-upload" className={styles.button}>
          Photo/Video
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleMediaUpload}
          />
        </label>
        <label>Feeling/Activity</label>
      </div>

      <div className={styles.selectedMedia}>
        {mediaContent.length > 0 && (
          <div className={styles.mediaPreview}>
            {mediaContent.map((file, index) => (
              file.type.startsWith('image') ? (
                <img key={index} src={URL.createObjectURL(file)} alt={`image-${index}`} />
              ) : (
                <video key={index} src={URL.createObjectURL(file)} controls />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
