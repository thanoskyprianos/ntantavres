export interface MonthAvailability {
  january?: boolean;
  february?: boolean;
  march?: boolean;
  april?: boolean;
  may?: boolean;
  june?: boolean;
  july?: boolean;
  august?: boolean;
  september?: boolean;
  october?: boolean;
  november?: boolean;
  december?: boolean;
}

export const allMonthsUnavailable: MonthAvailability = {
  january: false,
  february: false,
  march: false,
  april: false,
  may: false,
  june: false,
  july: false,
  august: false,
  september: false,
  october: false,
  november: false,
  december: false,
};
