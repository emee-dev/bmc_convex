"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllTemplateId, TemplateId, TemplateSelector } from "@/lib/utils";
import { useState } from "react";

type TemplateSelectorProps = {
  templates: TemplateSelector[];
  handleTemplateChange: (templateId: AllTemplateId) => void;
};

export function TemplateFileSelector({
  templates,
  handleTemplateChange,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<AllTemplateId>(
    "monthly_donation_subscription"
  );

  return (
    <Select
      value={selectedTemplate}
      onValueChange={(e: TemplateId) => {
        setSelectedTemplate(e);
        handleTemplateChange(e);
      }}
    >
      <SelectTrigger className="w-fit px-3 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {templates.map((template) => (
          <SelectItem
            key={template._id}
            value={template.templateId}
            className="flex items-center"
            checked={selectedTemplate === template.templateId}
          >
            {template.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
