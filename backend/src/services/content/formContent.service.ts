import FormContent, {
  FormContentDocument,
} from "@/models/content/formContent.model";

class FormContentService {
  async createFormContent(formContent: FormContentDocument) {
    const newFormContent = new FormContent(formContent);
    await newFormContent.save();
    return newFormContent;
  }

  async getFormContent(id: string) {
    return FormContent.findById(id);
  }

  async updateFormContent(id: string, update: Partial<FormContentDocument>) {
    const updatedFormContent = await FormContent.findByIdAndUpdate(id, update, {
      new: true,
    });
    return updatedFormContent;
  }

  async deleteFormContent(id: string) {
    await FormContent.findByIdAndDelete(id);
  }

  async getAllFormContent() {
    return FormContent.find();
  }
}

export default new FormContentService();
