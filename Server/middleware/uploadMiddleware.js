import multer from "multer";
import os from "os";

const upload = multer({ storage: multer.diskStorage({ destination: os.tmpdir() }) });

export default upload;