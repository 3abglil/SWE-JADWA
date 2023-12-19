// Define the interface
class packages_DB {
  constructor() {
      if (
          this.addCarPackage === null ||
          this.checkProviderExistence === null ||
          this.get_car_to_edit === null ||
          this.editCarPackage === null ||
          this.deleteCarPackages === null ||
          this.AddMedicalPackage === null ||
          this.get_Med_to_edit === null ||
          this.editMedicalPackage === null ||
          this.deleteMedicalPackages === null ||
          this.AddLifePackage === null ||
          this.get_Life_to_edit === null ||
          this.editLifePackage === null ||
          this.deleteLifePackages === null
      ) {
          throw new Error("Class does not implement interface!");
      }
  }
}

export default packages_DB;
