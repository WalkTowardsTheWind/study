import { openWindow } from "./";
import { dataURLtoBlob } from "./base64Conver";
import { dateUtil } from "./dateUtil";
import request from "@/utils/request";

/**
 * Download online pictures
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(
  url: string,
  params: any = {},
  filename?: string
) {
  return new Promise((resolve, reject) => {
    request({ url, method: "GET", params, responseType: "arraybuffer" })
      .then((res) => {
        const { data, headers } = res;
        const disposition = headers["content-disposition"];
        if (!disposition) {
          return ElMessage.error("无可下载凭证");
        }
        console.log(disposition, "2222");
        // 省略代码
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        const _name =
          filename ||
          decodeURIComponent(escape(matches[1].replace(/['"]/g, "")));
        downloadByData(data, _name, headers["content-type"]);
        resolve("下载成功");
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Download pictures based on base64
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(
  buf: string,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
}

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(
  data: BlobPart,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  const blob = new Blob(blobData, {
    type:
      mime ||
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  const fileNameArr = filename.split(".");
  const _filename = `${fileNameArr[0]}${dateUtil().format("YYYY/MM/DD")}.${
    fileNameArr[1]
  }`;
  tempLink.setAttribute("download", _filename);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = "_blank",
  fileName,
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean {
  console.log(url);
  const isChrome =
    window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  const isSafari =
    window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error("Your browser does not support download!");
    return false;
  }
  if (isChrome || isSafari) {
    const link = document.createElement("a");
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download =
        fileName || url.substring(url.lastIndexOf("/") + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf("?") === -1) {
    url += "?download";
  }

  openWindow(url, { target });
  return true;
}
