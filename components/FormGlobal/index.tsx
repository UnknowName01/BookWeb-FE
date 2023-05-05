import "./index.scss";
import {
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  RangePickerProps,
  Select,
  SelectProps,
} from "formik-antd";

function InputGlobal(props: InputProps): JSX.Element {
  return <Input {...props} className="input-global" />;
}

function SelectGlobal(props: SelectProps): JSX.Element {
  return <Select {...props} />;
}

function DatePickerGlobal(props: DatePickerProps): JSX.Element {
  return <DatePicker allowClear={false} {...props} format="DD-MM-YYYY" />;
}

function FormItemGlobal(props: FormItemProps): JSX.Element {
  return (
    <Form.Item hasFeedback {...props}>
      {props.children}
    </Form.Item>
  );
}

function RangePickerGlobal(prop: RangePickerProps): JSX.Element {
  return (
    <DatePicker.RangePicker
      {...prop}
      allowClear={false}
      style={{width: "100%"}}
    />
  );
}

function InputNumberGlobal(props: InputNumberProps): JSX.Element {
  return <InputNumber {...props} />;
}

function SelectMultiGlobal(props: SelectProps): JSX.Element {
  return <Select className="custom" allowClear mode="multiple" {...props} />;
}

export {
  FormItemGlobal,
  InputGlobal,
  SelectGlobal,
  DatePickerGlobal,
  RangePickerGlobal,
  InputNumberGlobal,
  SelectMultiGlobal,
};
