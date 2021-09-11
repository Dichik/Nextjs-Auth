import nc from "next-connect";

const handler = nc({
  onError: (error, req, res, next) => {
    console.log(error);
    res.status(500).end();
  },
});
