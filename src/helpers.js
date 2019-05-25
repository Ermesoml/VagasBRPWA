import dateFormat from "dateformat"

export default {
  formatarData(data) {
    return dateFormat(data, "dd/mm/yyyy")
  }
}