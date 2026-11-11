'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, BookingFormValues } from '@/lib/validations';
import { CARS_DATA, DEALERSHIPS } from '@/data/cars';
import { CarColor } from '@/types/car';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Calendar, Phone, Mail, User, Building2, Car as CarIcon, Sparkles } from 'lucide-react';

interface BookingFormProps {
  initialCarId?: string;
  initialColor?: CarColor;
  initialNotes?: string;
  onSuccess?: () => void;
}

export function BookingForm({
  initialCarId,
  initialColor,
  initialNotes,
  onSuccess,
}: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormValues | null>(null);

  const defaultNotes =
    initialNotes ||
    (initialColor
      ? `Tanlangan rang: ${initialColor.name} (${initialColor.hex})`
      : '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      phone: '+998 ',
      email: '',
      carId: initialCarId || (CARS_DATA[0]?.id ?? ''),
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      dealership: DEALERSHIPS[0]?.id ?? '',
      notes: defaultNotes,
    },
  });

  // Keep form in sync when initialCarId or initialColor changes
  React.useEffect(() => {
    if (initialCarId) {
      setValue('carId', initialCarId);
    }
    if (initialColor) {
      setValue('notes', `Tanlangan rang: ${initialColor.name} (${initialColor.hex})`);
    }
    setIsSubmitted(false);
    setSubmittedData(null);
  }, [initialCarId, initialColor, setValue]);

  const carOptions = CARS_DATA.map((car) => ({
    value: car.id,
    label: `${car.name} (${car.series})`,
  }));

  const dealershipOptions = DEALERSHIPS.map((dealer) => ({
    value: dealer.id,
    label: `${dealer.name} — ${dealer.city}`,
  }));

  const onSubmit = async (data: BookingFormValues) => {
    // Simulate real network API submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 3500);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  if (isSubmitted && submittedData) {
    const selectedCar = CARS_DATA.find((c) => c.id === submittedData.carId);
    const selectedDealer = DEALERSHIPS.find((d) => d.id === submittedData.dealership);

    return (
      <div className="py-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            Arizangiz Muvaffaqiyatli Qabul Qilindi!
          </h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto">
            Hurmatli <span className="text-white font-medium">{submittedData.fullName}</span>, sizning test-drive so‘rovingiz BMW dilerlik markaziga yuborildi.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">Tanlangan Model:</span>
            <span className="text-white font-semibold">{selectedCar?.name}</span>
          </div>
          {initialColor && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-400">Tanlangan Rang:</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: initialColor.hex }}
                />
                {initialColor.name}
              </span>
            </div>
          )}
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">Dilerlik Markazi:</span>
            <span className="text-white font-semibold">{selectedDealer?.name}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">Belgilangan Sana:</span>
            <span className="text-white font-semibold">{submittedData.preferredDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Aloqa Telefoni:</span>
            <span className="text-[#38bdf8] font-semibold">{submittedData.phone}</span>
          </div>
        </div>

        <p className="text-xs text-neutral-400">
          Mutaxassisimiz 15 daqiqa ichida siz bilan bog‘lanib, qat’iy vaqtni tasdiqlaydi.
        </p>

        <Button variant="secondary" size="md" onClick={handleReset}>
          Yana boshqa model tanlash
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Selected Color Pill (if initiated from color picker) */}
      {initialColor && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300">
          <span className="text-neutral-400">Tanlangan Rang:</span>
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
            style={{ backgroundColor: initialColor.hex }}
          />
          <span className="font-semibold text-white">{initialColor.name}</span>
          <span className="text-[10px] font-mono text-neutral-400">{initialColor.hex}</span>
        </div>
      )}

      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Ism va Familiya"
          placeholder="Alisher Navoiy"
          required
          leftIcon={<User className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="Telefon Raqami"
          placeholder="+998 90 123 45 67"
          required
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Email and Car Select */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Elektron Pochta"
          placeholder="nomingiz@mail.com"
          type="email"
          required
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Select
          label="BMW Modelini Tanlang"
          required
          options={carOptions}
          error={errors.carId?.message}
          {...register('carId')}
        />
      </div>

      {/* Dealership and Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Dilerlik Markazi (Shahar)"
          required
          options={dealershipOptions}
          error={errors.dealership?.message}
          {...register('dealership')}
        />

        <Input
          label="Qulay Sana"
          type="date"
          required
          min={new Date().toISOString().split('T')[0]}
          leftIcon={<Calendar className="w-4 h-4" />}
          error={errors.preferredDate?.message}
          {...register('preferredDate')}
        />
      </div>

      {/* Optional Note */}
      <div>
        <label className="block text-xs font-medium tracking-wide text-neutral-300 mb-1.5">
          Qo‘shimcha Istaklar yoki Savollar (ixtiyoriy)
        </label>
        <textarea
          rows={3}
          placeholder="Masalan: M sport paket yoki individual ranglar haqida ma'lumot olmoqchiman..."
          className="w-full bg-[#121316]/90 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4] focus:ring-1 focus:ring-[#1C69D4] resize-none"
          {...register('notes')}
        />
        {errors.notes && (
          <p className="text-xs text-[#ff6b6b] mt-1">{errors.notes.message}</p>
        )}
      </div>

      {/* Privacy disclaimer */}
      <p className="text-[11px] text-neutral-500 leading-tight">
        Tugmani bosish orqali siz BMW O‘zbekiston shaxsiy ma’lumotlarni qayta ishlash qoidalariga rozilik bildirasiz.
      </p>

      {/* Submit button */}
      <Button
        type="submit"
        variant="m-power"
        size="lg"
        isLoading={isSubmitting}
        className="w-full font-bold uppercase tracking-wider text-sm py-4 rounded-xl"
        rightIcon={<Sparkles className="w-4 h-4" />}
      >
        {isSubmitting ? 'Yuborilmoqda...' : 'Test-Drive ga yozilish'}
      </Button>
    </form>
  );
}
