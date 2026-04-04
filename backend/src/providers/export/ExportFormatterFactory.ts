import { ExportFormat } from "@/types/export.types";
import { IExportFormatter } from "./IExportFormatter";
import { RawFormatExporter } from "./RawFormatExporter";
import { PictoFormatExporter } from "./PictoFormatExporter";

/**
 * Factory for creating export formatter instances
 */
export class ExportFormatterFactory {
  private static formatters: Map<ExportFormat, IExportFormatter> = new Map();

  /**
   * Get or create formatter for a specific format
   */
  static getFormatter(format: ExportFormat): IExportFormatter {
    if (this.formatters.has(format)) {
      return this.formatters.get(format)!;
    }

    let formatter: IExportFormatter;

    switch (format) {
      case "raw":
        formatter = new RawFormatExporter();
        break;
      case "picto":
        formatter = new PictoFormatExporter();
        break;
      default:
        throw new Error(`Unknown export format: ${format}`);
    }

    this.formatters.set(format, formatter);
    return formatter;
  }

  /**
   * Clear cache (useful for testing)
   */
  static clear(): void {
    this.formatters.clear();
  }
}
