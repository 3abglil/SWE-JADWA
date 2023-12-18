import supabase from "../models/database.js";

const get_car_packages = async (req, res) => {
  try {
    // Select all providers from the 'Poviders' table
    const { data, error } = await supabase.from("CarPackages").select("*");

    if (error) {
      throw error;
    }

    res.render("pages/car_packages_view", {
      package: data,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } catch (error) {
    console.error("Error fetching Providers:", error.message);
    throw error;
  }
}

const get_medical_packages = async (req, res) => {
  try {
    // Select all providers from the 'Poviders' table
    const { data, error } = await supabase.from("MedicalPackages").select("*");

    if (error) {
      throw error;
    }

    res.render("pages/medical_packages_view", {
      package: data,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } catch (error) {
    console.error("Error fetching Providers:", error.message);
    throw error;
  }
}

const get_life_packages = async (req, res) => {
  try {
    // Select all providers from the 'Poviders' table
    const { data, error } = await supabase.from("LifePackages").select("*");

    if (error) {
      throw error;
    }

    res.render("pages/life_packages_view", {
      package: data,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } catch (error) {
    console.error("Error fetching Providers:", error.message);
    throw error;
  }
}

export { get_life_packages, get_medical_packages, get_car_packages };