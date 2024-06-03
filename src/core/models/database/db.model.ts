import { JsonObject, JsonProperty, JsonConverter, JsonConvert, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class NumberConverter implements JsonCustomConvert<number> {
    serialize(data: any): number {
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
    deserialize(data: any): number {
        if (typeof data === 'undefined' || data === null) {
            return data;
        }
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
}
@JsonConverter
export class StringConverter implements JsonCustomConvert<string> {
    serialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
    deserialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
}
@JsonConverter
export class BooleanConverter implements JsonCustomConvert<boolean> {
    serialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
    deserialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
}
@JsonConverter
export class DateTimeConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        function pad(number: any) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }
    deserialize(date: any): Date {
        const dReturn = new Date(date);
        if (dReturn.getFullYear() === 1970
            && dReturn.getMonth() === 0
            && dReturn.getDate() === 1) {
            return null as any;
        } else {
            return dReturn;
        }
    }
    
}
@JsonConverter
export class UniversityConverter implements JsonCustomConvert<University[]>{
    serialize(data: University[]) {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): University[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, University);
    }

}
@JsonConverter
export class MajorConverter implements JsonCustomConvert<Major[]>{
    serialize(data: Major[]) {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Major[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Major);
    }
}
@JsonConverter
export class SemesterConverter implements JsonCustomConvert<Semester[]>{
    serialize(data: Semester[]) {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Semester[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Semester);
    }
}
@JsonConverter
export class FolderConverter implements JsonCustomConvert<Folder[]>{
    serialize(data: Folder[]) {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Folder[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Folder);
    }
}
@JsonConverter
export class FileConverter implements JsonCustomConvert<File[]>{
    serialize(data: File[]) {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): File[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, File);
    }
}
@JsonObject("University")
export class University {
    @JsonProperty('UniversityId', NumberConverter, true)
    UniversityId: number = undefined as any;
    @JsonProperty('UniversityName', StringConverter, true)
    UniversityName: string = undefined as any;
}
@JsonObject("Major")
export class Major {
    @JsonProperty('MajorId', NumberConverter, true)
    MajorId: number = undefined as any;
    @JsonProperty('Name', StringConverter, true)
    Name: string = undefined as any;
}
@JsonObject("Semester")
export class Semester {
    @JsonProperty('SemesterId', NumberConverter, true)
    SemesterId: number = undefined as any;
    @JsonProperty('SemesterName', StringConverter, true)
    SemesterName: string = undefined as any;
}
@JsonObject("File")
export class File {
    @JsonProperty('FileId', NumberConverter, true)
    FileId: number = undefined as any;
    @JsonProperty('FileName', StringConverter, true)
    FileName: string = undefined as any;
    @JsonProperty('FolderId', NumberConverter, true)
    FolderId: number = undefined as any;
}
@JsonObject("Folder")
export class Folder {
    @JsonProperty('FolderId', NumberConverter, true)
    FolderId: number = undefined as any;
    @JsonProperty('FolderName', StringConverter, true)
    FolderName: string = undefined as any;
    @JsonProperty('File', File, true)
    File: File = undefined as any;
}
// @JsonObject("detailToDoList")
// export class detailToDoList {
//     @JsonProperty 
// }
