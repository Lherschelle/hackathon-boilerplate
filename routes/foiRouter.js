const express = require("express");
const foiRouter = express.Router({ mergeParams: true });
const { FOI } = require("../models/models");

foiRouter.get("/:id/contact", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  return res.render("FOI/contact", {
    formValues: { ...foi.dataValues },
  });
});

foiRouter.post("/:id/contact", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  let errors = {};
  const formValues = { ...req.body };

  if (!req.body.email) {
    errors.email =
      "Enter an email address in the correct format, like name@example.com";

    return res.render("FOI/contact", {
      errors: errors,
      formValues: formValues,
    });
  }

  await foi.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.email,
  });

  return res.redirect(`/FOI/${foi.id}/details`);
});

foiRouter.get("/:id/details", async (req, res, next) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  return res.render("FOI/details", {
    formValues: { ...foi.dataValues },
    backString: `/FOI/${foi.id}/contact`,
  });
});

foiRouter.post("/:id/details", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  let errors = {};
  const formValues = { ...req.body };

  if (!req.body.about) {
    errors.about = "Enter what your enquiry is about";
  }

  if (!req.body.enquiry) {
    errors.enquiry = "Enter your enquiry";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("FOI/details", {
      errors: errors,
      formValues: formValues,
    });
  }

  await foi.update({
    about: req.body.about,
    enquiry: req.body.enquiry,
  });

  return res.redirect(`/FOI/${foi.id}/summary`);
});

foiRouter.get("/:id/summary", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  return res.render("FOI/summary", {
    formValues: { ...foi.dataValues },
    backString: `/FOI/${foi.id}/details`,
  });
});

module.exports = foiRouter;
