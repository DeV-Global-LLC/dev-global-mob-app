import DatePicker from '@ui/DatePicker'
import { useForm } from 'react-hook-form'
import ImageAvatar from '@blocks/ImageAvatar'
import { Platform, StyleSheet, View } from 'react-native'
import TextInputField from '@ui/TextInputField'
import useFile from '@hooks/useFile'
import { useThemeColor } from '@hooks/useThemeColor'
import { projectDetailsContext } from '@ProjectDetailsContext'
import { memo, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useSecureStorage from '@hooks/useSecureStorage'
import useAxios from '@hooks/useAxios'

type ProjectDetailsInputsProps = {
    name: string;
    deadline: string;
    startDate: string;
    description: string;
}
const ProjectGeneralData = () => {
    const { post } = useAxios();
    const colors = useThemeColor();
    const { imagePicker, uploadFiles } = useFile();
    const [isNew, setIsNew] = useState<boolean>(true);
    const { control, reset, watch, setValue, formState: { errors } } = useForm<ProjectDetailsInputsProps>({});
    const { project: { _id, logo, name, description, deadline, startDate }, logoFile, setProjectLogo, setProjectGeneralData } = useContext(projectDetailsContext);

    useEffect(() => {
        if (_id)
            if (_id) {
                setIsNew(false);
                reset({ name, description, deadline, startDate });
            }
    }, [_id])

    const pickLogoImage = useCallback(async () => {
        const res = await imagePicker({ multiple: false });
        if (res) {
            const uploaded = await uploadFiles(res);
            console.log("Uploaded", uploaded);
            // setProjectLogo(res[0]);
        }
        res && setProjectLogo(res[0]);
    }, []);

    const onDateSelect = useCallback((name: string, value: Date | undefined) => {
        value && setValue(name as keyof ProjectDetailsInputsProps, value.toISOString());

    }, [])

    useEffect(() => {
        const allFields = watch();
        const { name, description, startDate, deadline } = watch();
        name && description && startDate && deadline && setProjectGeneralData(allFields);
    }, [watch('name'), watch('description'), watch('startDate'), watch('deadline')]);

    return (
        <View style={{ gap: 16, }}>
            <View style={[styles.logo, { backgroundColor: colors.card }, !logoFile?.uri && { paddingHorizontal: 60, paddingVertical: 20, }]}>
                <ImageAvatar onPress={pickLogoImage} type='project' url={logoFile?.uri || logo || ''} />
            </View>
            {isNew && <TextInputField
                name='name'
                control={control}
                label='Project title'
                labelColor={colors.primary}
                placeholder='Enter Project Name'
                errorMessage={errors.name?.message}
                rules={{ required: 'Project Name is required', minLength: { value: 5, message: 'Project Name is too short' } }}
            />}
            <TextInputField
                multiline
                align='justify'
                control={control}
                name='description'
                label='Description'
                labelColor={colors.primary}
                errorMessage={errors.description?.message}
                rules={{ required: 'Description is required', minLength: { value: 5, message: 'Project Description is too short' } }}
                placeholder='Lorem ipsum dolor sit amet consectetur. Viverra ut felis nisl duis elit nulla. Vulputate phar. Enim ultricies enim non blandit neque. Aliquam nibh pulvinar diam odio malesuada aliquet.'

            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 24 }}>
                <DatePicker value={startDate} label='Start Date' onChange={(d) => onDateSelect('startDate', d)} />
                <DatePicker value={deadline} label='End Date' onChange={(d) => onDateSelect('deadline', d)} />
            </View>
        </View>
    )
}

export default memo(ProjectGeneralData)

const styles = StyleSheet.create({
    // memberRemove: {
    //     borderWidth: 1,
    //     borderRadius: 20,
    //     borderColor: 'white',
    //     backgroundColor: 'red',
    // },
    // submit: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: 10 },
    logo: { borderColor: 'black', borderWidth: .07, borderRadius: 4, }
})
