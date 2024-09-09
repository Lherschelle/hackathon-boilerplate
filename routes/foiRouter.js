const express = require("express");
const foiRouter = express.Router({ mergeParams: true });
const { FOI } = require("../models/models");
const { generateReferenceNumber, validateEmail } = require("../utils");

foiRouter.get("/:id/contact", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi || foi.reference) {
    return res.redirect("404");
  }

  return res.render("FOI/contact", {
    formValues: { ...foi.dataValues },
  });
});

foiRouter.post("/:id/contact", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi || foi.reference) {
    return res.redirect("404");
  }

  let errors = {};
  const formValues = { ...req.body };

  if (!validateEmail(req.body.emailAddress)) {
    errors.emailAddress =
      "Enter an email address in the correct format, like name@example.com";

    return res.render("FOI/contact", {
      errors: errors,
      formValues: formValues,
    });
  }

  await foi.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
  });

  if (req.query.check === "true") {
    return res.redirect(`/FOI/${foi.id}/summary`);
  }

  return res.redirect(`/FOI/${foi.id}/details`);
});

foiRouter.get("/:id/details", async (req, res, next) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi || foi.reference) {
    return res.redirect("404");
  }

  return res.render("FOI/details", {
    formValues: { ...foi.dataValues },
    backUrl: `/FOI/${foi.id}/contact`,
  });
});

foiRouter.post("/:id/details", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi || foi.reference) {
    return res.redirect("404");
  }

  let errors = {};
  const formValues = { ...req.body };

  if (!req.body.about) {
    errors.about = "Enter what your request is about";
  }

  if (!req.body.enquiry) {
    errors.enquiry = "Enter the details of your request";
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

  if (!foi || foi.reference) {
    return res.redirect("404");
  }

  return res.render("FOI/summary", {
    formValues: { ...foi.dataValues },
    backUrl: `/FOI/${foi.id}/details`,
    changeContactUrl: `/FOI/${foi.id}/contact?check=true`,
    changeDetailsUrl: `/FOI/${foi.id}/details?check=true`,
  });
});

foiRouter.post("/:id/summary", async (req, res) => {
  {
    const foi = await FOI.findByPk(req.params.id);

    if (!foi || foi.reference) {
      return res.redirect("404");
    }

    let errors = {};
    if (!req.body.confirmationEmail) {
      errors.confirmationEmail = "Select an option";

      return res.render("FOI/summary", {
        errors: errors,
        formValues: { ...foi.dataValues },
        backUrl: `/FOI/${foi.id}/details`,
        changeContactUrl: `/FOI/${foi.id}/contact?check=true`,
        changeDetailsUrl: `/FOI/${foi.id}/details?check=true`,
      });
    }

    if (
      !foi.firstName ||
      !foi.lastName ||
      !foi.emailAddress ||
      !foi.about ||
      !foi.enquiry
    ) {
      errors.incompleteEnquiry =
        "You must complete all sections to submit your enquiry";
      return res.render("FOI/summary", {
        errors: errors,
        formValues: { ...foi.dataValues },
        backUrl: `/FOI/${foi.id}/details`,
        changeContactUrl: `/FOI/${foi.id}/contact?check=true`,
        changeDetailsUrl: `/FOI/${foi.id}/details?check=true`,
      });
    }

    if (req.body.confirmationEmail === "yes") {
      await foi.update({
        reference: generateReferenceNumber(),
        confirmationEmailSent: true,
      });
    } else {
      await foi.update({
        reference: generateReferenceNumber(),
      });
    }

    return res.redirect(`/FOI/${foi.id}/confirmation`);
  }
});

foiRouter.get("/:id/confirmation", async (req, res) => {
  const foi = await FOI.findByPk(req.params.id);

  if (!foi) {
    return res.redirect("404");
  }

  return res.render("FOI/confirmation", {
    reference: foi.reference,
    confirmationEmailSent: foi.confirmationEmailSent,
  });
});

module.exports = foiRouter;
