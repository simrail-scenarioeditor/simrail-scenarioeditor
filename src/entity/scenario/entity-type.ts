import { Action } from "./action"
import { Condition } from "./condition"
import { Content } from "./content"
import { Event } from "./event"
import { Resource } from "./resource"
import { LanguageContent } from "./language-content"
import { Mission } from "./mission"
import { Objective } from "./objective"
import { Timer } from "./timer"
import { Train } from "./train"
import { Trigger } from "./trigger"


export type EntityType = typeof Action | typeof Condition | typeof Content | typeof Event | typeof LanguageContent | typeof Mission | typeof Objective | typeof Resource | typeof Timer | typeof Train | typeof Trigger