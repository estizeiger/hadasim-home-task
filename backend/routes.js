const express = require("express");
const Member = require("./member");

const router = express.Router();

// crud api
router.get("/api/members", (req, res) => {
  Member.find().then((documents) => {
    res.status(200).json({
      message: "Members fetched successfully",
      members: documents,
    });
  });
});

router.get("/api/members/:id", (req, res) => {
  Member.findOne({ _id: req.params.id }).then((document) => {
    res.status(200).json({
      message: "Member fetched successfully",
      member: document,
    });
  });
});

router.post("/api/members", async (req, res) => {
  console.log("/api/members/create", req.body);
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json({
      message: "Member added successfully",
      id: newMember._id,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
});

router.put("/api/members/:id", (req, res) => {
  Member.updateOne(
    { _id: req.params.id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tz: req.body.tz,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      phone: req.body.phone,
      mobile: req.body.mobile,
      positiveResultDate: req.body.positiveResultDate,
      recoveryDate: req.body.recoveryDate,
      vaccines: req.body.vaccines,
    }
  ).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Updated member" });
  });
});

router.delete("/api/members/:id", (req, res) => {
  Member.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted member" });
  });
});

module.exports = router;
