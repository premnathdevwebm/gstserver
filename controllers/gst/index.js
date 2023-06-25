const mongoose = require("mongoose");
const Gst = mongoose.model("Gst");
const XlsxPopulate = require("xlsx-populate");
const cloudinary = require("../../config/cloudinaryUpload");

const postGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.create({
      ...req.body,
      user: req.auth.name,
      scn: req.body.scn,
      oio: req.body.oio,
      status: req.body?.status ?? "",
      appealorder: req.body.appealorder,
      predeposit: req.body.predeposit,
      recovery: req.body.recovery,
      appeal: req.body.appeal,
    });
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};
const getGsts = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gsts",
      });
    }
    const filter = { status: { $nin: ["14", "13"] } };
    const gsts = await Gst.find(filter);
    res.json(gsts);
  } catch (err) {
    return res.status(404);
  }
};
const getHistory = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gsts",
      });
    }
    const filter = { status: { $in: ["13", "14"] } };
    const gsts = await Gst.find(filter);
    res.json(gsts);
  } catch (err) {
    return res.status(404);
  }
};
const getGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const gst = await Gst.findOne({ _id: req.params.id });
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};
const excelgst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }

    const data = [
      { name: "John Doe", age: 30 },
      { name: "Jane Smith", age: 25 },
    ];

    ///

    XlsxPopulate.fromBlankAsync()
      .then((workbook) => {
        const worksheet = workbook.sheet(0);

        // Set column headers
        worksheet.cell("A1").value("");
        worksheet.cell("B1").value("Name");
        worksheet.cell("C1").value("Age");

       /* 
       
        // Merge cells for the empty header
        worksheet.range("A1:C1").merged(true);

        // Set alignment for the empty header
        worksheet.cell("A1").style({
          horizontalAlignment: "center",
        });

         */

        data.forEach((item, index) => {
          worksheet.cell(`B${index + 2}`).value(item.name);
          worksheet.cell(`C${index + 2}`).value(item.age);
        });

        return workbook.outputAsync();
      })
      .then((excelBuffer) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              use_filename: true,
              unique_filename: false,
              format: "xlsx",
            },
            (error, result) => {
              if (error) {
                throw new Error(error);
              } else {
                return res.json({ data: `${result.secure_url}` });
              }
            }
          )
          .end(excelBuffer);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    return res.status(404).json({ data: err.message });
  }
};
const updateGst = async (req, res) => {
  try {
    if (!req.auth._id) {
      return res.status(401).json({
        message: "UnauthorizedError: private gst",
      });
    }
    const updateQuery = {};
    updateQuery[`status`] = req.body?.status;
    updateQuery[`scn.${req.params.index}`] = { ...req.body.scn };
    updateQuery[`oio.${req.params.index}`] = { ...req.body.oio };
    updateQuery[`appealorder.${req.params.index}`] = {
      ...req.body.appealorder,
    };
    updateQuery[`predeposit.${req.params.index}`] = { ...req.body.predeposit };
    updateQuery[`recovery.${req.params.index}`] = { ...req.body.recovery };
    updateQuery[`appeal.${req.params.index}`] = { ...req.body.appeal };
    const gst = await Gst.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: updateQuery,
      },
      { new: true }
    );
    res.json(gst);
  } catch (err) {
    return res.status(404);
  }
};

module.exports = { postGst, getGsts, excelgst, getHistory, getGst, updateGst };
