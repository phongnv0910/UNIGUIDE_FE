import { Any, JsonObject, JsonProperty } from "json2typescript";
import { University } from "./database/db.model";

@JsonObject("Responses")
export class Responses {
    @JsonProperty("data", Any, true)
    data:any = undefined;

    @JsonProperty("message", Any, true)
    message: any = undefined;

    @JsonProperty("statusCode", Any, true)
    statusCode: any = undefined;
    
}
