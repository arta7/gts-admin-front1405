import Swal from 'sweetalert2'
const HRMSwal = new (class {
  fire(options: any) {
    Swal.fire(options)
  }

  warning(options = {}) {
    return Swal.fire({
      customClass: {
        container: 'cssjss-swal-container',
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
      confirmButtonColor: '#f8bb86',
      ...options,
    })
  }

  delete(recordRep = null, options = {}) {
    return Swal.fire({
      title: `Delete <span style="color: #d9534f">${
        recordRep || 'Record'
      }<span>?`,
      text: 'Are you sure? This record will be deleted!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete it!',
      confirmButtonColor: '#d9534f',
      ...options,
    })
  }
})()

export default HRMSwal
