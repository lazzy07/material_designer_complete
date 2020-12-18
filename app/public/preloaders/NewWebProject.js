let importerType = "newwebproject";
console.log("NEW WEB PROJECT PRELOAD");
function setImporterType(type){
  importerType = type;
}
window.type = "newwebproject";
module.exports = {
  setImporterType,
  importerType
}