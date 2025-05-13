import { useAlertStore} from "@/store/alert.js";
import {storeToRefs} from "pinia";


export function useAlert() {
  const { alerts } = storeToRefs(useAlertStore())
  const {vAlert, vSuccess} = useAlertStore()
  return { alerts, vAlert, vSuccess }
}
