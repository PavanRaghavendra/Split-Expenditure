import Swal from 'sweetalert2'
export function Popup(props)
{
  const { title, text, icon } = props;
    Swal.fire({
        title: title,
        text: text,
        icon:icon
      });
}