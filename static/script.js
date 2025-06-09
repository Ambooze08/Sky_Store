const upload = document.querySelector(".upload");
const hiddenBtn = document.querySelector(".hidden-upload-btn");
const progress = document.querySelector(".progress");
const percent = document.querySelector(".percent");
const pause = document.querySelector(".pause");
const resume = document.querySelector(".resume");
const cancel = document.querySelector(".cancel");
const expandContainer = document.querySelector(".expand-container");
const loader = document.querySelector(".loader");

let xhr = null;

// Show files list on page load
window.onload = showFilesList;

// Upload file
upload.onclick = () => hiddenBtn.click();

hiddenBtn.onchange = function () {
  const file = hiddenBtn.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      progress.style.width = percentComplete + "%";
      percent.textContent = percentComplete + "%";
    }
  };

  xhr.open("POST", "/upload", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      percent.textContent = "DONE";
      progress.style.width = "100%";
      showFilesList();
    } else {
      alert("Upload failed");
    }
    upload.disabled = false;
  };

  xhr.send(formData);
  upload.disabled = true;

  pause.onclick = function () {
    xhr.abort();
    resume.style.display = "inline-block";
    pause.style.display = "none";
  };

  resume.onclick = function () {
    percent.textContent = "0%";
    progress.style.width = "0%";
    resume.style.display = "none";
    pause.style.display = "inline-block";
    hiddenBtn.dispatchEvent(new Event("change")); // retry
  };

  cancel.onclick = function () {
    xhr.abort();
    progress.style.width = "0%";
    percent.textContent = "0%";
    upload.disabled = false;
  };
};

// Fetch and display file list
function showFilesList() {
  fetch("/files")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("video").innerHTML = "";
      document.getElementById("audio").innerHTML = "";
      document.getElementById("image").innerHTML = "";

      data.forEach((file) => {
        const [type, name] = file.split("/");
        const container = document.getElementById(type);
        if (container) {
          container.innerHTML += `
                        <li data-name="${file}">
                            <span>${name}</span>
                            <svg onclick="expand(this)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/>
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
                            </svg>
                        </li>
                    `;
        }
      });
    });
}

// Expand file menu
function expand(el) {
  const li = el.closest("li");
  const rect = li.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  expandContainer.style.top = rect.top + scrollTop + "px";
  expandContainer.style.left = rect.right + 10 + "px";
  expandContainer.style.display = "block";

  expandContainer.setAttribute("data-file-name", li.getAttribute("data-name"));
}

// Hide file menu
function shrink() {
  expandContainer.style.display = "none";
}

// Open file in new tab
function openFile(el) {
  const path = expandContainer.getAttribute("data-file-name");
  loader.style.display = "block";
  window.open(`/open/${encodeURIComponent(path)}`, "_blank");
  loader.style.display = "none";
  shrink();
}

// Download file
function downloadFile(el) {
  const path = expandContainer.getAttribute("data-file-name");
  loader.style.display = "block";
  window.location.href = `/download/${encodeURIComponent(path)}`;
  loader.style.display = "none";
  shrink();
}

// Delete file
function deleteFile(el) {
  const path = expandContainer.getAttribute("data-file-name");
  fetch(`/delete/${encodeURIComponent(path)}`, { method: "DELETE" }).then(
    (res) => {
      if (res.ok) {
        showFilesList();
        shrink();
      }
    }
  );
}

// Close menu when clicking outside
window.addEventListener("click", function (e) {
  if (!expandContainer.contains(e.target) && !e.target.closest("svg")) {
    shrink();
  }
});
