import { ToastType, toast } from 'vue3-toastify';

export const showErrorNotification = (errorMessage: string) => {
  showNotification(`Error ${errorMessage}`, 'error');
};

export const showAddUrlSuccessNotification = () => {
  showNotification('Add URL success', 'default');
};

export const showTokenExpireNotification = () => {
  showNotification('Token expired! Please re-login!', 'error');
};

export const showLoginSuccessNotification = (username: string) => {
  showNotification(`Hello, ${username}!`, 'success');
};

export const showCopySuccessNotification = () => {
  showNotification('Copy success', 'success');
};

export const showDeleteSuccessNotification = () => {
  showNotification('Delete url success', 'default');
};

export const showUpdateSuccessNotification = () => {
  showNotification('Update success', 'success');
};

const showNotification = (message: string, type: ToastType) => {
  toast(message, {
    theme: 'auto',
    type: type,
    position: 'bottom-right',
    autoClose: 2000,
    dangerouslyHTMLString: true,
    pauseOnFocusLoss: false
  });
};
