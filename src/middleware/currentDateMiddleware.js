// const customResponse = require("../utils/responceObject");
// const dateFormet = require("../utils/dateFormet");
// const currentDateMiddleware = async (req, res, next) => {
//   try {
//     const currentDate = new Date();
//     currentDate.setHours(currentDate.getHours() + 5);
//     currentDate.setMinutes(currentDate.getMinutes() + 30);
//     let currentDateString = await dateFormet.dateFormetdd_mm_yyyy({
//       date: currentDate,
//     });

//     let currentDateUnix = Math.floor( currentDate.getTime() / 1000).toString()
//     req.body.currentDate = currentDate;
//     req.body.currentDateString = currentDateString;
//     req.body.currentDateUnix = currentDateUnix;
//     next()

 
//   } catch (e) {
//     res.send({ ...customResponse, errorMessage: e, message: e.message });
//   }
// };
// module.exports = currentDateMiddleware;
