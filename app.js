const fileInput = document.getElementById("fileInput");
const generateBtn = document.getElementById("generateBtn");
const imgPreview = document.getElementById("imgPreview");
const videoPreview = document.getElementById("videoPreview");
const outputCode = document.getElementById("outputCode");
const copyBtn = document.getElementById("copyBtn");

let selectedFile;

fileInput.addEventListener("change", (e) => {
  selectedFile = e.target.files[0];
  outputCode.value = "";

  if (!selectedFile) return;

  const reader = new FileReader();
  
  if(selectedFile.type.startsWith("image/")) {
    reader.onload = () => {
      imgPreview.src = reader.result;
      imgPreview.style.display = "block";
      videoPreview.style.display = "none";
    }
    reader.readAsDataURL(selectedFile);
  } else if(selectedFile.type.startsWith("video/")) {
    const videoURL = URL.createObjectURL(selectedFile);
    videoPreview.src = videoURL;
    videoPreview.style.display = "block";
    imgPreview.style.display = "none";
  }
});

generateBtn.addEventListener("click", () => {
  if (!selectedFile) {
    alert("اختر صورة أو فيديو أولاً!");
    return;
  }

  if(selectedFile.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      outputCode.value = reader.result;
    }
    reader.readAsDataURL(selectedFile);
  } else if(selectedFile.type.startsWith("video/")) {
    const videoURL = URL.createObjectURL(selectedFile);
    outputCode.value = videoURL;
  }
});

copyBtn.addEventListener("click", () => {
  outputCode.select();
  navigator.clipboard.writeText(outputCode.value);
  alert("تم النسخ!");
});
