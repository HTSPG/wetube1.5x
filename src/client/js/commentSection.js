import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
//가짜 댓글을 만들면서 새로운 댓글의 id를 포함시키는 부분.

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  if (text === "") {
    return;
  }
  //서버가 fetch로부터 오는 데이터를 이해할수있도록 작업을 해줘야 한다!
  const response = await fetch(`/api/vidoes/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //express에게 json관련 string을 보내고 있다고 알려줘야 한다.
    },
    body: JSON.stringify({ text }),
    //object를 string화 시키는 방법

    //프론트엔드에서는 js object를 string으로 바꿔서 백엔드에 보내준다
    //백엔드에서는 string을 받아서 js object로 바꿔준다.
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    //response안에 json을 추출한다.
    //그 json안에는 video controller에서 보낸 newCommentId가 있다.
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  event.preventDefault();
  const { id } = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

//어떠한 click이벤트가 발생하면 handleDelete가 발동된다!
