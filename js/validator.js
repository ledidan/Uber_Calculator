var mangThongBao = [
  "Vui lòng nhập số Kilometers !",
  "Vui lòng nhập thời gian chờ !",
  "Ký tự nhập phải là số !",
];

let re = /^[0-9]*$/g;

function getMyEl(el) {
  return document.getElementById(el);
}

function checkError(idField, idThongBao, arrIndexDB) {
  var valueField = getMyEl(idField).value;
  var thongBao = getMyEl(idThongBao);
  var m = valueField.match(re);
  thongBao.style.color = "red";
  thongBao.style.display = "block";
  if (valueField === "" || !m) {
    thongBao.innerHTML = mangThongBao[arrIndexDB];
  } else {
    thongBao.style.display = "none";
  }
}
function checkErrorNum(idField, idThongBao, arrIndexDB) {
  var input = getMyEl(idField).value.match(re);
  var thongBao = getMyEl(idThongBao);
  thongBao.style.color = "red";
  thongBao.style.display = "block";
  if (!input) {
    thongBao.innerHTML = mangThongBao[arrIndexDB];
  } else {
    thongBao.style.display = "none";
  }
}
getMyEl("tinhtien").addEventListener("click", function () {
  checkError("soKM", "thongBaoLoiKM", 0);
  checkError("thoiGianCho", "thongBaoLoiTime", 1);
  checkErrorNum("soKM", "thongBaoLoiKyTu1", 2);
  checkErrorNum("thoiGianCho", "thongBaoLoiKyTu2", 2);
});
