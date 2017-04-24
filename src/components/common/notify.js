import toastr from 'toastr';

toastr.options = {
 "positionClass": "toast-bottom-right"
};

export default {
  
  success: function(message) {
    toastr.success(message);
  },

  error: function(message) {
    toastr.error(message);
  },
  
  warning: function(message) {
    toastr.warning(message);
  }
}