import { toast } from "sonner";
import { LoginDataUser } from "../../types/authtype";
import { AllLinksType } from "../../context/AuthContext";
import { LinkApp } from "../../types/apptype";
import { services } from "..";

const loadData = async (
    user: LoginDataUser
  ): Promise<AllLinksType | null> => {
    try {

      const data: LinkApp[] = user.idusuario
        ? await services.applications.AllApplicationAuthByIdusuario(
            user.idusuario
          )
        : [];

      const datapowerbib: LinkApp[] = user.idarea
        ? await services.applications.AllApplicationAuthPowerBiBByIdarea(
            user.idarea
          )
        : [];
    

      const filterData = (type: string, hab?: string): LinkApp[] =>
        data.filter(
          (item: LinkApp) => item.type === type && (!hab || item.hab === hab)
        );

      const publicsapp: LinkApp[] = filterData("public");
      const powerBiA: LinkApp[] = filterData("powerBiA");
      const powerBiB: LinkApp[] = datapowerbib;
      const powerBiC: LinkApp[] = filterData("powerBiC", "SI");
      const privates: LinkApp[] = filterData("private", "SI");
      const sugested: LinkApp[] = data.filter(
        (item: LinkApp) =>
          item.type === "sugest" &&
          item.auth === "true" &&
          item.idusuario === user?.idusuario
      );

      const publicsAdd: LinkApp[] = [...publicsapp, ...privates];

      return {
        publics: publicsAdd,
        public: publicsapp,
        private: privates,
        sugest: sugested,
        powerBi: { A: powerBiA, B: powerBiB, C: powerBiC },
      };
    } catch (error) {
      console.info("Error al cargar las aplicaciones", error);
      toast.error("Error al cargar las aplicaciones.");
      throw error;
    }
  };


  export const helper = {
    loadData,
  };