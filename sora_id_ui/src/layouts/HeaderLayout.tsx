import styles from "@/assets/scss/layouts/HeaderLayout.module.scss";

const HeaderLayout = () => {
  return (
    <div class={styles.header}>
      <div>Logo</div>
      <div class="dropdown">
        <button
          class="btn btn-link dropdown-toggle"
          classList={{ [styles.avatar]: true }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-user-tie"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLayout;
