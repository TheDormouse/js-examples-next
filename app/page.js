import { UserForm } from "./UserForm";
import { FormProvider } from "./utils";
import { UserForm2 } from "./UserForm2";
import styles from "./index.module.css";

export default function Home() {
  async function myAction(data) {
    "use server";
    console.log(data);
  }
  return (
    <FormProvider>
      <div className={styles.grid}>
        <div>
          <UserForm action={myAction} />
        </div>
        <div>
          <UserForm2 action={myAction} />
        </div>
      </div>
    </FormProvider>
  );
}
