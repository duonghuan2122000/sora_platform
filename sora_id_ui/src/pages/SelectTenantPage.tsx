import tenantAPI, { type TenantDto } from "@/apis/tenant/TenantAPI";
import SoraButton from "@/components/buttons/SoraButton";
import SoraRadio from "@/components/radios/SoraRadio";
import { RouterConst } from "@/routers/RouterConst";
import { useNavigate } from "@solidjs/router";
import { createSignal, For, onMount } from "solid-js";

export default function SelectTenantPage() {
  const RadioSelectTenantName = "TenantRadio";

  const navigate = useNavigate();

  /**
   * Danh sách tenants
   */
  const [tenants, setTenants] = createSignal<TenantDto[]>([]);

  /**
   * Id tenant đang được chọn
   */
  const [selectedTenantId, setSelectedTenantId] = createSignal<
    string | undefined
  >();

  onMount(() => {
    getTenantsByCurrentUser();
  });

  /**
   * Hàm xử lý lấy danh sách tenant
   */
  const getTenantsByCurrentUser = async () => {
    const tenantRes = await tenantAPI.getListByCurrentUser();
    if (!tenantRes.success) {
    }
    let tenants = tenantRes.data ?? [];
    setTenants(tenants);
    if (tenants.length > 0) {
      setSelectedTenantId(tenants[0]?.id);
    }
  };

  /**
   * Hàm xử lý chọn tenant
   */
  const handleSelectTenantToWork = async () => {
    let tenantId = selectedTenantId();
    if (!tenantId) {
      return;
    }
    const selectTenantToWorkRes = await tenantAPI.selectTenantToWork(tenantId);
    if (!selectTenantToWorkRes.success) {
    }
    navigate(RouterConst.ListAppIntegration);
  };

  return (
    <div class="col-sm-6 offset-sm-3 mt-3">
      <div class="card">
        <div class="card-body">
          <div class="h5">Vui lòng chọn đơn vị làm việc</div>
          <hr />
          <div>
            <For each={tenants()}>
              {(tenant) => (
                <SoraRadio
                  name={RadioSelectTenantName}
                  label={tenant.name}
                  value={tenant.id}
                  selected={selectedTenantId()}
                  onChange={(tenantId) => setSelectedTenantId(tenantId)}
                />
              )}
            </For>
          </div>
          <div class="d-flex flex-row justify-content-end">
            <SoraButton
              text="Đi"
              type="primary"
              onClick={handleSelectTenantToWork}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
