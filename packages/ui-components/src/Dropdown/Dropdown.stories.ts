import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "optionWithIcon", label: "Option With Icon" },
      { value: "longLongLongOption4", label: "Long Long Long Option 4" },
      {
        value: "longLongLongLongOption4",
        label: "Long Long Long Long Option 5",
      },
    ],
    onChange: fn(),
    placeholder: "Select an option",
    label: "Dropdown",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    multiple: false,
    withSearch: true,
  },
};

export const MultiSelect: Story = {
  args: {
    multiple: true,
    withSearch: true,
  },
};

export const WithoutSearch: Story = {
  args: {
    multiple: false,
    withSearch: false,
  },
};
