
export default function hanldeValidationEditUser(editData, errors) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;
    if (!/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(editData.editPhoneNumber)) {
        errors.editPhoneNumber = 'Số điện thoại phải 10 chữ số';
    }
    if (editData.editPhoneNumber == '' || editData.editPhoneNumber == null || editData.editPhoneNumber == " ") {
        errors.editPhoneNumber = "Số điện thoại không được để trống";
    }
    if (editData.editFullName == '' || editData.editFullName == null || editData.editFullName == " ") {
        errors.editFullName = "Tên không được để trống";
    }
    if (/^[a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚÝàáâãèéêếìíòóôõùúýĂăĐđĨĩŨũƠơƯưỠốộỐỘỒỚỜỬỨỮửỷỶỳỴỵỸỹ\s]+$/.test(editData.editFullName)) {
        errors.editFullName = "Tên không chứa kí tự đặc biệt";
    }
    if (editData.editBirthDay == '' || editData.editBirthDay == null || editData.editBirthDay == " ") {
        errors.editBirthDay = "Ngày sinh không được để trống";
    }
    console.log(current);
    console.log(editData.editBirthDay)
    if (editData.editBirthDay > current == true) {
        errors.editBirthDay = "Ngày sinh phải nhỏ hơn ngày hiện tại";
    }
}


export function hanldeValidationCreateMod(creataData, errors, emailList) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;
    if (!/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(creataData.createPhoneNumber)) {
        errors.createPhoneNumber = 'Số điện thoại phải 10 chữ số';
    }
    if (creataData.createPhoneNumber == '' || creataData.createPhoneNumber == null || creataData.createPhoneNumber == " ") {
        errors.createPhoneNumber = "Số điện thoại không được để trống";
    }
    if (creataData.createFullName == '' || creataData.createFullName == null || creataData.createFullName == " ") {
        errors.createFullName = "Tên không được để trống";
    }
    if (/^[a-zA-Z0-9ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚÝàáâãèéêếìíòóôõùúýĂăĐđĨĩŨũƠơƯưỠốộỐỘỒỚỜỬỨỮửỷỶỳỴỵỸỹ\s]+$/.test(creataData.createFullName)) {
        errors.createFullName = "Tên không chứa kí tự đặc biệt";
    }
    if (creataData.createEmail == '' || creataData.createEmail == null || creataData.createEmail == " ") {
        errors.createEmail = "Email không được để trống"
    } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creataData.createEmail)) {
            errors.createEmail = "Email sai định dạng";
        }
    }
    if (emailList.includes(creataData.createEmail)) {
        errors.createEmail = "Email đã được đăng ký";
    }
    if (creataData.createBirthDay == '' || creataData.createBirthDay == null || creataData.createBirthDay == " ") {
        errors.createBirthDay = "Ngày sinh không được để trống";
    }
    if (creataData.createBirthDay > current == true) {
        errors.createBirthDay = "Ngày sinh phải nhỏ hơn ngày hiện tại";
    }

    if (creataData.createGender == undefined || creataData.createGender == null || creataData.createGender == "") {
        errors.createGender = "Giới tính không được để trống"
    }
}