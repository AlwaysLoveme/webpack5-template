<template>
  <a-form
    ref="formRef"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <a-input placeholder="666" />
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Domains' : ''"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        placeholder="please input domain"
        style="width: 60%; margin-right: 8px"
      />
      <MinusCircleOutlined
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        :disabled="dynamicValidateForm.domains.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <PlusOutlined />
        Add field
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm"
        >Submit</a-button
      >
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
  <a-cascader
    v-model:value="value"
    :options="options"
    :load-data="loadData"
    placeholder="Please select"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, UnwrapRef } from "vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";

interface Domain {
  value: string;
  key: number;
}

interface Option {
  value: string;
  label: string;
  loading?: boolean;
  isLeaf?: boolean;
  children?: Option[];
}

export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },

  setup() {
    const formRef = ref();
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const dynamicValidateForm: UnwrapRef<{ domains: Domain[] }> = reactive({
      domains: [],
    });
    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", dynamicValidateForm.domains);
        })
        .catch((error: ValidateErrorEntity<any>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: Domain) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    };

    const options = ref<Option[]>([
      {
        value: "zhejiang",
        label: "Zhejiang",
        isLeaf: false,
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        isLeaf: false,
      },
    ]);
    const value = ref<string[]>([]);

    const loadData = (selectedOptions: Option[]) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: "dynamic1",
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: "dynamic2",
          },
        ];
        options.value = [...options.value];
      }, 1000);
    };

    return {
      value,
      options,
      loadData,
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
    };
  },
});
</script>

<style scoped lang="less">
div {
  text-align: center;
  padding: 10%;
}
</style>
